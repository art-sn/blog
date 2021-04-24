import React, {ChangeEvent} from "react";
import {useRef} from "react";
import s from './profile.module.scss'
import {ProfileType} from "../../common-types";
import UserPhoto from "../tools/UserPhoto";
import EditableTextarea from "../tools/EditableTextarea";


function configureDate(date: string) {
    const [year, month, monthName, day, hour, minute] = date.split(' ')
    return `${day} ${monthName} ${year}`
}

type PropsType = {
    user: ProfileType
    isOwner: boolean
    setPhoto: (photo: File) => void
    setAboutMe: (aboutMe: string) => void
}


function UserInfo({user, isOwner, setPhoto, setAboutMe}: PropsType) {
    const imageInputRef = useRef<HTMLInputElement>(null)

    function clickFileInput() {
        imageInputRef.current?.click()
    }

    function handlePhotoInputChange(ev: ChangeEvent<HTMLInputElement>) {
        if (ev.target.files?.length && ev.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            setPhoto(ev.target.files[0])
        }
    }

    const aboutMeValidator = (text: string) => text.length < 500

    return <>
        <div className={s.user}>
            {isOwner ? <>
                    <input type="file" style={{display: 'none'}} ref={imageInputRef} onChange={handlePhotoInputChange}/>
                    <UserPhoto photo={user.photo} round handleClick={clickFileInput} style={{cursor: 'pointer'}}/>
                </>
                : <UserPhoto photo={user.photo} round/>}

            <div className={s.info}>
                <div className={s.block}>
                    <strong style={{color: 'green'}}>{user.timesLiked}</strong><br/>
                    <small>Total Likes</small>
                </div>
                <div className={s.block}>
                    <strong style={{color: 'red'}}>{user.timesDisliked}</strong><br/>
                    <small>Total Dislikes</small>
                </div>
                <div className={s.block}>
                    <strong style={{fontSize: '1.2em', color: 'blue'}}>{configureDate(user.dateJoined)}</strong><br/>
                    <small>Registration Date</small>
                </div>
            </div>
            <h2>{user.username}</h2>
            <EditableTextarea saveChanges={setAboutMe} isOwner={isOwner} defaultText={user.aboutMe}
                              emptyText={'User didn\'t tell anything about himself'} mainDivClassName={s.aboutMe}
                              saveButtonClassName={'transparent-blue-btn'} cancelButtonClassName={'transparent-red-btn'}
                              editButtonClassName={'transparent-blue-btn'} validate={aboutMeValidator}
                              textareaClassName={'blue-input'}
            />
        </div>

    </>

}

export default UserInfo


