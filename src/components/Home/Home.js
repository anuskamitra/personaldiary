import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../InputControl/Form";
import Textarea from "../InputControl/Textarea";
import { db } from "../../firebase";
import Styles from "./Home.module.css";
import Card from "../card/Card";

// import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  where,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { ShowChartOutlined } from "@mui/icons-material";

function Home(props) {
  const collectionRef = collection(db, "diary");
  const mail = props.email;
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);
  const [updateButtonClicked, setUpdateButtonClicked] = useState({
    id: 0,
    cond: false,
  });
  const [newText, setNewText] = useState("");
 

  const savedoc = () => {
    addDoc(collectionRef, {
      mailID: mail,
      dailyThings: text,
      createdAt: serverTimestamp(),
    });
    getUser();
    setText("");
  };
  const getUser = async() => {
    const q =query(collectionRef,where ("mailID","==",mail),orderBy("createdAt","desc"))
   const data=await getDocs(q);
  
    // getDocs(collectionRef).then((data) => {
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
  };

  const update = (id, text) => {
    const userDoc = doc(db, "diary", id);
    updateDoc(userDoc, { dailyThings: text }).then(() => {
      setUpdateButtonClicked((prev) => ({
        id: 0,
        cond: false,
      }));
      // getUser();
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "diary", id));
    // getUser();
  };
  useEffect(() => {
    getUser();
  });
  return (
    <div>
      <h2 className={Styles.heading}>
        Welcome-{props.email}
        <img src="./smile.svg" alt="diary photo" />
      </h2>
      <div className={Styles.body}>
        <div className={Styles.form}>
          {/* <h2>{props.email ? `Welcome-${props.email}` : "Please Login"}</h2> */}
          <div className={Styles.input}>
            <Textarea
              label="Oh , This is a dear diary moment !!!"
              type="text"
              placeholder="Write your thoughts ..."
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            <button className={Styles.btn} onClick={savedoc}>
              {" "}
              submit
            </button>
          </div>
        </div>
        <div className={Styles.container}>
          {user.map((userInfo) => {
            // console.log(userInfo.createdAt.toDate().toDateString());
            return (
              <div className={Styles.textDiv}>
                {/* <h3 key={userInfo.id} className={`${activeItem===userInfo?show===true?Styles.dailyThingsShowFull:Styles.dailyThings:Styles.dailyThings}`} onClick={()=>handleActive(userInfo)} > {userInfo.dailyThings}</h3> */}
                {/* {date}   {time} */}
                <Card
                  key={userInfo.id}
                  content={userInfo.dailyThings}
                  // createdAtDate={getTimeAndDate}
                  createdAtDate={userInfo.createdAt}
                  //  createdAtTime={userInfo.createdAt.toDate().toLocaleTimeString()}
                />
                <div className={Styles.buttons}>
                  {updateButtonClicked.id === userInfo.id &&
                  updateButtonClicked.cond ? (
                    <div className={Styles.button}>
                      <Form
                        key={userInfo.id}
                        defaultValue={newText}
                        onChange={(event) => {
                          setNewText(event.target.value);
                        }}
                      />
                      {/* <div className={Styles.update}> */}
                      <button
                        className={Styles.btn}
                        onClick={() => update(userInfo.id, newText)}
                      >
                        submit
                      </button>
                      {/* </div> */}
                    </div>
                  ) : (
                    <div className={Styles.button}>
                      <button
                        className={Styles.btn}
                        onClick={() => {
                          setNewText(userInfo.dailyThings);
                          setUpdateButtonClicked(() => ({
                            id: userInfo.id,
                            cond: true,
                          }));
                        }}
                      >
                        <i class="fa-solid fa-pen-to-square">Update</i>
                      </button>
                    </div>
                  )}
                  {/* </div> */}
                  <div className={Styles.delete} key={userInfo.id}>
                    <button
                      className={Styles.btn}
                      onClick={() => handleDelete(userInfo.id)}
                    >
                      <i class="fa-solid fa-trash">Delete</i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
