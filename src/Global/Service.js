
import React, { useEffect, useState, useRef } from 'react';
import { View, useColorScheme, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import * as types  from '../redux/types';


export const baseUrl = 'https://helpb.onrender.com/api/donator-app/'
// shop/eat
//API END POINT LISTS  

export const USER_REGISTER = `/signup`
export const login = '/signin'
export const all_Category = 'categories?limit=10&offset=0'
export const category = '/service/'
export const allServices = '/services'
export const searchService = '/search'
export const wallet_history = '/wallet'
export const show_service_id = '/service/'
export const profile = '/profile'
export const forgot_email = '/verify-email'
export const verify_otp = `/verify-Otp`;
export const new_password = `/change-password`;
export const user_address = `user/address`;
export const update_profile = `/profile/update`;
export const pending_orders = `/orders/pending`;
export const complete_orders = `/orders/complete`;
export const assign_form = `/orders/`;
export const delete_Update_Address = `user/address/id/`;
export const wallet_payments = `/wallet/show`;
export const chekout_get = `/orders/`;
export const post_assignForm = `/orders/submit-form`;
export const apply_coupon = `/orders/coupon`;
export const apply_wallet = `/orders/checkout/wallet`;
export const razorpay_checkout = `/orders/checkout`;
export const submit_form = `/orders/submit-form`;



export const homePage_slider =`get-all-sliders`
export const sucess_slider =`get-success-stories`
export const sucess_stories =`getSuccessStory`
export const new_Campaign =`get-new-campaign`
export const blogs_Campaign =`recent-posts`
export const read_blog=`get-News`
export const top_Campaign =`get-featured-campaigns`
export const slug_fundraiser =`get-campaign-by-Slug`
export const donation =`recent-donors`
export const add_comments=`comments`
export const recent_donor=`recent-donors/`
export const top_donor=`get-top-donors/`
export const donation_history=`donations-by-User/`
export const trending_days=`get-Trending-Campaigns`
export const my_campaign=`get-campaigns-by-user`
export const get_weeklyData=`get-weekly-data`
export const campaign_bycategory=`get-Campaign-By-Category`
export const news_details=`get-News-By-Slug`
export const camp_data=`get-campaign-data`
export const userData=`/user`
export  const new_cap=`/campaign`
export const get_notifications=`get-Notifications`
export const clear_notification=`clear-Notifications`
export const donate=`add-donation`
export const update_camp=`campaign/`
export const donation_id=`donation`
export const request_refund=`request-refund`
export const delete_Capm=`/delete-campaign/`
export const post_update=`post-Update-Campaign/`
export const deduction80g=`/get80G`
export const claimfifty=`get501C`
export const giftAid=`getGiftAid`
export const get_allDonations=`campaign-donations`
export const read_notification=`/read-Notification`
export const get_editCamp=`/get-edit-campaign`




export const requestPostApi = async (endPoint, body, method, token) => {
    console.log('the token is :-', token)
    var header = {}
    if (token != '' && token != undefined) {
        header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
    } else {
        header = { "Content-Type": "application/json", 'Accept': 'application/json' }
    }
    var url = baseUrl + endPoint
    console.log('post Request Url:-' + url + '\n')
    console.log('the body data', body)
    // console.log(header + '\n')
    try {
        let response = await fetch(url, {
            method: method,
            body: body == '' ? '' : JSON.stringify(body),
            headers: header,
        }
        )
        let code = await response.status
        console.log('the api responce is------------->>', url)
        //  let responseJ = await response.json();
        //  console.log('the api responce is',responseJ.headers)
        if (code == 200) {
            let responseJson = await response.json();
            console.log(responseJson, '-------------kkkkkkkkkkkkkkkkk')
            return { responseJson: responseJson, err: null }
        } else if (code == 400 || code == 402) {
            let responseJson = await response.json();
            //Completion block 
            return { responseJson: responseJson, err: responseJson.message }
        } else {
            let responseJson = await response.json();
            // console.log(responson)
            return { responseJson: responseJson, err: responseJson.message }
        }
    } catch (error) {
        console.log('the error is', error)
        return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
        // return {responseJson:null,err:error}
    }
}

export const requestPostApiXToken = async (endPoint, body, method, token) => {
    console.log('the token is :-', token)
    var header = {}
    if (token != '' && token != undefined) {
        header = { 'Content-Type': 'application/json', 'X-Token': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
    } else {
        header = { "Content-Type": "application/json", 'Accept': 'application/json' }
    }

    var url = baseUrl + endPoint
    console.log('post Request Url:-' + url + '\n')
    console.log('the body data', body)
    // console.log(header + '\n')
    try {

        let response = await fetch(url, {
            method: method,
            body: body == '' ? '' : JSON.stringify(body),
            headers: header,
        }
        )
        let code = await response.status
        console.log('the api responce is-------------->>>>>>', code)
        //  let responseJ = await response.json();
        //  console.log('the api responce is',responseJ.headers)
        if (code == 200) {
            let responseJson = await response.json();
            console.log(responseJson, 'hhhhhhhhhhhhhh')
            return { responseJson: responseJson, err: null }
        } else if (code == 400 || code == 402) {
            let responseJson = await response.json();
            //Completion block 
            return { responseJson: responseJson, err: responseJson.headers.message }
        } else {
            let responseJson = await response.json();
            // console.log(responson)
            return { responseJson: responseJson, err: responseJson.headers.message }
        }
    } catch (error) {
        console.log('the error is', error)
        return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
        // return {responseJson:null,err:error}
    }
}




export const requestGetApi = async (endPoint, body, method, token) => {
    console.log('the token is :-', token)
    var header = {}
    var url = baseUrl + endPoint

    if (token != '' && token != undefined) {
        header = { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
    } else {
        header = {}
    }

    //url = url + objToQueryString(body)
    console.log('Request Url:-' + url + '\n')
    try {
        let response = await fetch(url, {
            method: method,
            headers: header,
        }
        )
        console.log('response from asign api', response);
        let code = await response.status

        console.log(code)
        if (code == 200) {
            let responseJson = await response.json();
            console.log('Code 200==>>', responseJson)

            return { responseJson: responseJson, err: null, code: code }
        } else if (code == 400) {
            return { responseJson: null, err: responseJson.message, code: code }

        } else if (code == 500) {
            console.log(response)

            return { responseJson: null, err: 'Something Went Wrong', code: code }

        } else {
            console.log(response)

            return { responseJson: null, err: 'Something went wrong!', code: code }
        }
    } catch (error) {
        console.error(error);
        return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.', code: 500 }

    }
}

export const requestGetApixToken = async (endPoint, body, method, token) => {
    console.log('the token is :-', token)
    var header = {}
    var url = baseUrl + endPoint

    if (token != '' && token != undefined) {
        header = { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json', 'X-Token': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
    } else {
        header = {}
    }

    //url = url + objToQueryString(body)
    console.log('Request Url:-' + url + '\n')
    try {
        let response = await fetch(url, {
            method: method,
            headers: header,
        }
        )
        // console.log('response from asign api', response);
        let code = await response.status
        console.log(code)
        if (code == 200) {
            let responseJson = await response.json();
            console.log('Code 200==>>', responseJson)
            return { responseJson: responseJson, err: null, code: code }
        } else if (code == 400) {
            return { responseJson: null, err: responseJson.message, code: code }

        } else if (code == 500) {
            console.log(response)

            return { responseJson: null, err: 'Something Went Wrong', code: code }

        } else {
            console.log(response)

            return { responseJson: null, err: 'Something went wrong!', code: code }
        }
    } catch (error) {
        console.error(error);
        return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.', code: 500 }

    }
}

export const requestPostApiMedia = async (endPoint, formData, method, token) => {
    var header = {}

    if (token != '' && token != undefined) {
        header = {
            'Content-type': 'multipart/form-data', 'apitoken': token, 'Cache-Control': 'no-cache'
        }
    } else {
        if (endPoint != signUpApi) {
            header = {
                'Content-type': 'multipart/form-data', 'Cache-Control': 'no-cache'
            }
        }
    }

    var url = baseUrl + endPoint
    console.log('Request Url:-' + url + '\n')
    console.log(formData + '\n')

    try {
        let response = await fetch(url, {
            method: method,
            body: formData,

            headers: header,

        }
        )

        let code = await response.status
        console.log(code)

        if (code == 200) {
            let responseJson = await response.json();
            console.log(responseJson)
            return { responseJson: responseJson, err: null }
        } else if (code == 400) {
            let responseJson = await response.json();
            return { responseJson: null, err: responseJson.message }

        } else {

            return { responseJson: null, err: 'Something went wrong!' }
        }
    } catch (error) {
        console.error('the error of the uploade image is ==>>', error);
        return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }

    }
}

export const requestPostApiSignUp = async (endPoint, formData, method) => {
    var url = baseUrl + endPoint
    console.log('Request Url:-' + url + '\n')
    console.log(formData + '\n')

    try {
        let response = await fetch(url, {
            method: method,
            body: formData,
        }
        )

        let code = await response.status
        console.log(code)

        if (code == 200) {
            let responseJson = await response.json();
            console.log(responseJson)
            return { responseJson: responseJson, err: null }
        } else if (code == 400 || 402) {
            let responseJson = await response.json();
            console.log(responseJson)

            return { responseJson: null, err: responseJson.msg }

        } else {

            return { responseJson: null, err: 'Something went wrong!' }
        }
    } catch (error) {

        return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
        console.error(error);
    }
}

const objToQueryString = (obj) => {

    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
}



//function : get api
export const getApi = endPoint =>
    axios
        .get(`${baseUrl}${endPoint}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            if (error == `Error: Network Error`) {
                Alert.alert(
                    '',
                    `Internet connection appears to be offline. Please check your internet connection and try again.`,
                );
            }
            console.log('data', error.response.data);
            console.log('status', error.response.status);
            console.log('headers', error.response.headers);
            return error;
        });
//function : post api
export const postApi = (endPoint, data) =>
    axios
        .post(`${baseUrl}${endPoint}`, data)
        .then(res => {
            return res;
        })
        .catch(error => {
            if (error == `Error: Network Error`) {
                Alert.alert(
                    '',
                    `Internet connection appears to be offline. Please check your internet connection and try again.`,
                );
            }
            console.log('data', error.response.data);
            console.log('status', error.response.status);
            console.log('headers', error.response.headers);
            return error;
        });
//function : get api with token
export const getApiWithToken = (token, endPoint) =>
    axios
        .get(`${baseUrl}${endPoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            if (error == `Error: Network Error`) {
                Alert.alert(
                    '',
                    `Internet connection appears to be offline. Please check your internet connection and try again.`,
                );
            }
            console.log('data', error.response.data);
            console.log('status', error.response.status);
            console.log('headers', error.response.headers);
            return error;
        });
//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
    axios
        .post(`${baseUrl}${endPoint}`, data, {
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            if (error == `Error: Network Error`) {
                Alert.alert(
                    '',
                    `Internet connection appears to be offline. Please check your internet connection and try again.`,
                );
            }
            console.log('data', error.response.data);
            console.log('status', error.response.status);
            console.log('headers', error.response.headers);
            return error;
        });
//function : put api with token
// export const putApiWithToken = (token, endPoint, data) =>
//   axios
//     .put(`${baseUrl}${endPoint}`, data, {
//       headers: {
//         Authorization: `Bearer${token}`,
//         'Content-Type': 'application/json',
//         Accept: '*/*',
//       },
//     })
//     .then(res => {
//       console.log(res, 'res');
//       return res;
//     })
//     .catch(error => {
//       console.log('error', error);
//       if (error == `Error: Network Error`) {

//         Alert.alert(
//           '',
//           `Internet connection appears to be offline. Please check your internet connection and try again.`,
//         );
//       }
//       console.log('data', error.response.data);
//       console.log('status', error.response.status);
//       console.log('headers', error.response.headers);
//       return error;
//     });
export const putApiWithToken = (token, endPoint, data) =>
    axios
        .put(`${baseUrl}${endPoint}`, data, {
            headers:
                Object.keys(data).length > 0
                    ? {
                        'Content-Type': 'multipart/form-data',
                        Accept: '*/*',
                        Authorization: `Bearer ${token}`,
                    }
                    : {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            if (error?.response?.status === 422) {
                // Alert.alert('', `${error.response.data.message}`);
                // Toast.show(error.response.data.message, Toast.SHORT);
                console.log('data', error.response.data);
                console.log('status', error.response.status);
                console.log(error.response.headers);
            } else if (error?.response?.status === 404) {
                // Alert.alert('', `${error.response.data.message}`);
                // Toast.show(error.response.data.message, Toast.SHORT);
                console.log('error status', error?.response?.status);
                console.log('error message', error.response.data.message);
            } else if (error?.response?.status === 401) {
                // Alert.alert('', `${error.response.data.message}`);
                // Toast.show(error.response.data.message, Toast.SHORT);
                console.log('error status', error?.response?.status);
                console.log('error message', error.response.data.message);
            } else if (error?.response?.status === 500) {
                // Alert.alert('', `${error.response.data.message}`);
                // Toast.show(error.response.data.message, Toast.SHORT);
                console.log('error status', error?.response?.status);
                console.log('error message', error.response.data.message);
            } else {
                // Alert.alert('', `${error}`);
                // Toast.show(error.response.data.message, Toast.SHORT);
                console.log('error status', error?.response?.status);
                console.log('error message', error.response.data.message);
            }
        });