import React from "react"; 
import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const Room = () => {

    const {roomId} = useParams() 

    const myMeeting = async(element) => {
        const appId = 1196154279;
        const serverSecret = '01e5cdb9c963b05c8554e5ac45711ea7';
        const kitTokern = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret, 
            roomId, 
            Date.now().toString(), 
            "Chirag Yadav"
        );
        const zc = ZegoUIKitPrebuilt.create(kitTokern);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `https://localhost:3000/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
        });
    };

  return (
    <div>
      <div ref={myMeeting}/>
    </div>
  )
}

export default Room
