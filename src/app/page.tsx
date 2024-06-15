"use client"
import { useEffect , useState} from "react";
import { useRouter } from "next/navigation";
// import {
   // removeToken,
//    getToken} from '../app/utils/auth'
import style from '@/app/utils/utils.module.css'
import axios from "axios";
import {localApi} from '@/components/constants'
import UserList from "@/components/UserList";
import AddUserPopup from '@/components/AddUserPopup'
// import Cookies from 'js-cookie';

interface User{
  id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
}

interface UserObject{
  id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
}



export default function Home() {
  // const [users,setUsers]= useState([])
  // const api = localApi
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [userObject, setUserObject] = useState<UserObject | []>([])

  const [users,setUsers]= useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const api = localApi
  const [error,setError]= useState("")

  useEffect(()=>{
      // if(!getToken()){
      //   router.push('/login')
      // }else{
        fetchUsers();
      // }
    
    },[showPopup])

  

    const fetchUsers = async ()=>{
      try{
        const response =await axios.get(`${api}/user/alldata`)
        // console.log(response.data);
        if(response.data){
            setUsers(response.data)
        }else{
          console.log(response);
          
        }
      }catch(err){
        console.log('Failed to fetch users', err);
        
      }
    }

  // console.log(users);
  // useEffect(()=>{
  //   console.log(userObject);
    
  // },[showPopup])

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.get(`${api}/user/std/${id}`);
      setSelectedUserId(id);
      setUserObject(response.data); // Set user data
      setShowPopup(true); // Open the popup
    } catch (error) {
      console.error("Failed to fetch user data for editing", error);
    }
  };

  // console.log("userObject",userObject);
  

  const handleDelete=async (id: number)=>{
    try{
        setShowPopup(false)
        const response = await axios.get(`${api}/user/dltStd/${id}`)
        setUsers(users.filter(user => user.id !== id));


    }catch(err){
        console.log("Failed to delete object", err);
        
    }
  }
  

  const handleLogout = async () => {
    // console.log("working");
    
    try {
      await axios.get(`${api}/user/logout`,{
        withCredentials:true
      });
      router.push('/login');
    } catch (error) {      
      console.error('Failed to logout:', error);

    }
  };
  

  const handleAddUser = async ()=>{
    setShowPopup(true)
    setUserObject([])
  }

  const handleClosePopup=()=>{
    setShowPopup(false)
  }



  return (
    <div>
       <div className={style.cntr}>
      <h1 className="text-center py-2 text-2xl mt-1 font-bold">Student Info</h1>
      <button 
      onClick={handleAddUser}
      className="absolute right-8 top-4 text-[2F4C45] hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        Add Student
      </button>
      <div className="flex justify-center relative top-6">
        <table className={style.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
           {
            users.map(user=>{
              return(
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td >
                    <div className="flex gap-5 justify-center">
                      
                  <div className="text-[blue] underline hover:cursor-pointer"  
                    onClick={()=>handleEdit(user.id)}
                    >
                      Edit
                    </div>
                    <div className="text-[blue] underline hover:cursor-pointer"  
                    onClick={()=>handleDelete(user.id)}
                    >
                      Delete
                    </div>
                      </div>
                  </td>

                </tr>
              )
            })
           }
          </tbody>
        </table>
        {/* <AddUserPopup userData={userObject} /> */}
      </div>
{/* <UserList onClose={handleClosePopup} onOpen={handleAddUser} userData={userObject} setUserObject={setUserObject} /> */}

    </div>
      <button
            className="absolute left-8 top-4 text-[2F4C45] hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
       onClick={handleLogout}>Logout</button>
       {
        showPopup && <AddUserPopup onClose={handleClosePopup} onOpen={handleAddUser} currentUser = {userObject}
        // onClose={handleClosePopup} onOpen={handleAddUser} userData = {userObject}
        />
       }
    </div>
  );
}
