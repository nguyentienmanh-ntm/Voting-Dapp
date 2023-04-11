import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";


import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const allwowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, setFormInput] = useState({
    name: '',
    address: '',
    position: '',
  });

  const router = useRouter()
  const { uploadToIPFS, createdVoter } = useContext(VotingContext)

  // voter image drop
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
    setFileUrl(url)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  })


  console.log(fileUrl)

  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
          <div className={Style.voterInfo}>
            <img src={fileUrl} alt="asset_file" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name: <span>&nbsp;{formInput.name}</span>{" "}
              </p>
              <p>
                Add:&nbsp; <span>{formInput.address.slice(0, 20)} </span>
              </p>
              <p>
                Pos:&nbsp;<span>{formInput.position}</span>
              </p>
            </div>
          </div>
        )}

        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create candidate For Voting</h4>
              <p>
                Blockchain voting orgainzation, provide ethereum
                Blockchain eco system
              </p>

              <p className={Style.sideInfo_para}>Contract candidate List</p>
            </div>

            <div className={Style.car}>
              {/* {VoterArray.map((el, i) => (
              <div className={Style.card_box}>
                <div className={Style.image}>
                  <img src="" alt="Profice photo" />
                </div>

                <div className={Style.card_info}>
                  <p>Name</p>
                  <p>Address</p>
                  <p>Details</p>
                </div>
              </div>
              ))} */}
            </div>
          </div>
        )}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <h1>Create new voter</h1>
          <div className={Style.voter__container__box}>
            <div className={Style.voter__container__box__div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter__container__box__div_info}>
                  <p>Upload File: JPG, PNG, GIF, WEBM MAX 10MB</p>
                  <div className={Style.voter__container__box__div__image}>
                    <Image
                      src={images.upload}
                      width={150}
                      height={150}
                      objectFit="contain"
                      alt="file upload"
                    />
                  </div>
                  <p>Drag & Drop file</p>
                  <p>or Browse media on your devive</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* container */}
        <div className={Style.input__container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Voter Name"
            handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })
            }
          />

          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) => setFormInput({ ...formInput, address: e.target.value })
            }
          />

          <Input
            inputType="text"
            title="Position"
            placeholder="Voter Position"
            handleClick={(e) => setFormInput({ ...formInput, position: e.target.value })
            }
          />

          <div className={Style.Button}>
            <Button btnName="Authorized Voter" handleClick={() => createdVoter(formInput, fileUrl, router)} />
          </div>
        </div>
      </div>

      <div className={Style.createdVoter}>
        <div className={Style.createVoter__info}>
          <Image src={images.creator} alt="user Profile" />
          <p>Notice For User</p>
          <p>
            Organizer <span>0x990f8...</span>
          </p>
          <p> Only organizer of the voting contract can create voter and candidate
            for voting election
          </p>
        </div>
      </div>
    </div>
  )
}



export default allwowedVoters