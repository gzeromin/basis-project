import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './MembersPage.module.scss';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';

function MembersPage(props) {

  const [MemberList, setMemberList] = useState([]);
  const [ModifyMember, setModifyMember] = useState(null);
  const [SendMailMember, setSendMailMember] = useState(null);

  useEffect(() => {
    fetchMemberList();
  }, []);
  
  const fetchMemberList = () => {
    axios.get('/api/user/allMembers').then(res => {
      if(res.data.success) {
        setMemberList(res.data.result);
      } else {
        alert('Fail to get member List');
      }
    });
  };

  
  const renderMemberList = MemberList.map((member, index) => {
    const setEmail = (e) => {
      member.email = e.currentTarget.value;
      updateMemberList();
    }
    
    const setMailCheck = (e) => {
      if(e.target.checked) {
        member.mailCheck = 1;
      } else {
        member.mailCheck = 0;
      }
      updateMemberList();
    }
    
    const setRole = (e) => {
      member.role = e.target.value;
      updateMemberList();
    }

    const updateMemberList = () => {
      const newMemberList = MemberList.map((newMember, newIndex) => {
        if(index === newIndex) return member;
        return newMember;
      })
      setMemberList(newMemberList);
    }
    
    const save = () => {
      axios.post('/api/user/updateMember', member).then(res => {
        if(res.data.success) {
          setMemberList(res.data.result);
        } else {
          alert('Fail to get member List');
        }
      });
      setModifyMember(null);
    };
    
    const cancel = () => {
      setModifyMember(null);
      setSendMailMember(null);
    }
    
    let email;
    let pass;
    const inputEmailHandler = (e) => {
      email = e.currentTarget.value;
    }
    const inputPasswordHandler = (e) => {
      pass = e.currentTarget.value;
    }
    const sendMail = () => {
      const reqObj = {
        member,
        email,
        pass
      }
      axios.post('/api/user/sendMail', reqObj).then(res => {
        if(res.data.success) {
          email = '';
          pass = '';
          console.log(res.data.result);
          setMemberList(res.data.result);
        } else {
          alert('fail');
        }
        setSendMailMember(null);
      });
    }
    if(ModifyMember === member._id) {
      return (
        <tr 
          key={index}
          className={style.tr}
        >
          <td className={style.td}>
            {index}
          </td>
          <td className={style.td}>
            {member.name}
          </td>
          <td className={style.td}>
            <input type='text' value={member.email} onChange={setEmail} />
          </td>
          <td className={style.td}>
            <input 
              type='checkbox' 
              onChange={setMailCheck}
              checked={member.mailCheck === 1}
            />
          </td>
          <td className={style.td}>
            <select 
              name='role'
              onChange={setRole}
              value={member.role}
            >
              <option value={1}> Admin </option>
              <option value={0}> Member </option>
            </select>
          </td>
          <td className={style.td}>
            <button 
              className={style.button}
              onClick={save}
            >
              save
            </button> &nbsp;
            <button 
              className={style.button}
              onClick={cancel}
            >
              cancel
            </button>
          </td>
          <td className={style.td}>
            <button 
              className={style.button}
              disabled
            >
              send mail
            </button>
          </td>
        </tr>
      )
    } else if(SendMailMember === member._id) {
      return (
        <tr 
          key={index}
          className={style.tr}
        >
          <td className={style.td}>{index}</td>
          <td className={style.td}>{member.name}</td>
          <td className={style.td}>{member.email}</td>
          <td className={style.td}>{member.mailCheck === 1 ?
            <i 
              className={`material-icons`}
            >
              done
            </i>
            :
            ''
          }</td>
          <td className={style.td}>{member.role === 1 ? 'Admin': 'Member'}</td>
          <td className={style.td}>
            <button 
              className={style.button}
              disabled
            >
              modify
            </button>
          </td>
          <td className={style.td}>
            <input type='text' placeholder="email" onChange={inputEmailHandler}/>
            <input type='password' placeholder="password" onChange={inputPasswordHandler}/>
            <button 
              className={style.button}
              disabled={ModifyMember !== null}
              onClick={sendMail}
            >
              send mail
            </button>
            <button 
              className={style.button}
              onClick={cancel}
            >
              cancel
            </button>
          </td>
        </tr>
      )
    }
    return (
      <tr 
        key={index}
        className={style.tr}
      >
        <td className={style.td}>{index}</td>
        <td className={style.td}>{member.name}</td>
        <td className={style.td}>{member.email}</td>
        <td className={style.td}>{member.mailCheck === 1 ?
          <i 
            className={`material-icons`}
          >
            done
          </i>
          :
          ''
        }</td>
        <td className={style.td}>{member.role === 1 ? 'Admin': 'Member'}</td>
        <td className={style.td}>
          <button 
            className={style.button}
            onClick={() => setModifyMember(member._id)}
            disabled={ModifyMember !== null || SendMailMember !== null}
          >
            modify
          </button>
        </td>
        <td className={style.td}>
          <button 
            className={style.button}
            onClick={() => setSendMailMember(member._id)}
            disabled={ModifyMember !== null || SendMailMember !== null}
          >
            send mail
          </button>
        </td>
      </tr>
    )
  });

  return (
    <div className={style.wrapper}>
      <p>Members</p>
      <hr/><br/>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.tr}>
            <th className={style.th}>No</th>
            <th className={style.th}>Name</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>MailCheck</th>
            <th className={style.th}>Role</th>
            <th className={style.th}></th>
            <th className={style.th}></th>
          </tr>
        </thead>
        <tbody  className={style.tbody}>
          { renderMemberList }
        </tbody>
      </table>
    </div>
  )
}

export default MembersPage;
