import React, {useEffect} from "react";
import * as FirestoreProfileService from '../services/firebaseProfiles';

export function useFetchProfiles({
    setProfiles,
    setLoaded,
    setCurrentProfile,
}) {
    useEffect(() => {
        console.log("running useEffect");
        FirestoreProfileService.fetchProfileNameList()
          .then(doc => {
            if (doc.exists) {
              setProfiles(doc.data());
              setLoaded(true);
            } else {
              console.log('Document not found')
            }
          })
          .catch(() => console.log('Error'));
        }, [])

        useEffect(() => {
          FirestoreProfileService.getProfile(profileID)
          .then(doc => {
            if (doc.exists) {
              setCurrentProfile(doc.data());
              setLoaded(true);
            } else {
              console.log('Document not found')
            }
          })
          .catch(() => console.log('Error'));
        }, [profileID])

        console.log("currentProfile:", currentProfile)

}