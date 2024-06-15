import { useEffect , useState} from "react";
import { useRouter } from "next/navigation";
import {  getToken } from "@/app/utils/auth";
import axios from "axios";
import style from '@/app/utils/utils.module.css'
import {localApi} from '@/components/constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUserPopup from "./AddUserPopup";

function UserList({onClose, onOpen , userData, setUserObject}) {
    const [users,setUsers]= useState([])
    const [selectedUserId, setSelectedUserId] = useState(null);
    const router = useRouter()
    const api = localApi
    const [error,setError]= useState("")

    useEffect(()=>{
        if(!getToken()){
          router.push('/login')
        }else{
          fetchUsers();
        }
      },[])

      const fetchUsers = async ()=>{
        try{
          const response =await axios.get(`${api}/user/alldata`)
          console.log(response.data);
          if(response.data){
              setUsers(response.data)
          }else{
            console.log(response);
            
          }
        }catch(err){
          console.log('Failed to fetch users', err);
          
        }
      }

      const handleAdd=()=>{


      }
    
      const handleEdit = async (id) => {
        try {
          const response = await axios.get(`${api}/user/std/${id}`);
          setSelectedUserId(id);
          setUserObject(response.data); // Set user data
          onOpen(); // Open the popup
        } catch (error) {
          console.error("Failed to fetch user data for editing", error);
        }
      };
    
      const handleDelete=()=>{
    
      }
    

  return (
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
  )
}

export default UserList