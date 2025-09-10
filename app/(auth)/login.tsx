import { Octicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
export default function Login(){
    const [username, setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isloading, setIsloading] = useState(false)
    return (
        <View style={styles.container} >
        
            <View style={styles.formInputWrapper}>
                <Octicons name="person" size = {20} color ="#0005" />
                <TextInput 
                cursorColor={'#000'}
                style={styles.input}
                value= {username}
                onChangeText={username => setUserName(username)}
                placeholder='Username' />
            </View>
            <View style={styles.formInputWrapper}>
                <Octicons name="shield-lock" size = {20} color ="#0005" />
                <TextInput 
                cursorColor={'#000'}
                style={styles.input}
                value= {password}
                secureTextEntry ={true}
                onChangeText={username => setPassword(password)}
                placeholder='Password' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 55,
        backgroundColor: '#f7f9ef',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#000',
        paddingLeft: 8
    }, 
    input: {
        width: '90%',
        height: '100%',
        marginLeft: 10
    }
});