import { register } from '@/api/auth';
import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, Text, StyleSheet, Alert } from 'react-native';
// 👇 This assumes you already have the stylesheet you shared (container, formInputWrapper, input, buttonWrapper)
// import styles from './styles'; // <- adjust import to wherever your styles live

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const canSubmit =
        firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        /\S+@\S+\.\S+/.test(email) &&
        password.length >= 8;
    const onSubmit = async () => {
        if (!canSubmit) {
            Alert.alert("Form is not complete!");
            return;
        }
        try {
            setIsLoading(true);

            if(password !== validatePassword) {
                      Alert.alert("Passwords do not match!")
                return;
            }
            // TODO: call your sign-up API here
            // await register({ firstName, lastName, email, password });
            const resp = await register(firstName, lastName, email, password);
            console.log(resp.message);
            switch(resp.message) {
                case "success":
                    Alert.alert("Account created successfuly!");
                    return;
                case "duplicate":
                    Alert.alert("A user already exists with that email!");
                    return;
                default:
                    Alert.alert(`An unkown error occured: ${resp.message}`);
                    return;
                

            }
        } finally {
            setIsLoading(false);
        }
    };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            justifyContent: 'center',
            alignItems: 'stretch',   // ⬅️ make children take full width
            alignSelf: 'stretch',    // ⬅️ ensure this screen fills parent width
            backgroundColor: '#fff',
        },
        formInputWrapper: {
            width: '100%',           // ⬅️ full width rows
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#0002',
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 14,
            marginBottom: 16,
            backgroundColor: '#fff',
            // If you're on older RN, remove `gap`—it can be quirky on Android:
            // gap: 8,
        },
        input: {
            flex: 1,
            fontSize: 18,
            paddingVertical: 8,
            minHeight: 48,
            marginLeft: 8,           // ⬅️ replaces gap for broader support
        },
        buttonWrapper: {
            marginTop: 16,
            width: '100%',
            alignSelf: 'stretch',
        },
        text: {
            fontSize: 16,
            color: '#444',
        },
        link: {
            fontSize: 16,
            color: '#007bff',
            marginLeft: 6,
        },
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 24,
        },
    });



    return (
        <View style={styles.container}>
            {/* First Name */}
            <View style={styles.formInputWrapper}>
                <Octicons name="person" size={20} color="#0005" />
                <TextInput
                    style={styles.input}
                    cursorColor="#000"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First name"
                    autoCapitalize="words"
                    textContentType="givenName"
                    returnKeyType="next"
                />
            </View>

            {/* Last Name */}
            <View style={styles.formInputWrapper}>
                <Octicons name="person" size={20} color="#0005" />
                <TextInput
                    style={styles.input}
                    cursorColor="#000"
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last name"
                    autoCapitalize="words"
                    textContentType="familyName"
                    returnKeyType="next"
                />
            </View>

            {/* Email */}
            <View style={styles.formInputWrapper}>
                <Octicons name="mail" size={20} color="#0005" />
                <TextInput
                    style={styles.input}
                    cursorColor="#000"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    returnKeyType="next"
                />
            </View>

            {/* Password */}
            <View style={styles.formInputWrapper}>
                <Octicons name="shield-lock" size={20} color="#0005" />
                <TextInput
                    style={styles.input}
                    cursorColor="#000"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    textContentType="newPassword"
                    autoCapitalize="none"
                    returnKeyType="done"
                />
            </View>

                        {/* Validate Password */}
            <View style={styles.formInputWrapper}>
                <Octicons name="shield-lock" size={20} color="#0005" />
                <TextInput
                    style={styles.input}
                    cursorColor="#000"
                    value={validatePassword}
                    placeholder="Verify Password"
                    onChangeText={setValidatePassword}
                    secureTextEntry
                    textContentType="newPassword"
                    autoCapitalize="none"
                    returnKeyType="done"
                />
            </View>

            <View style={styles.buttonWrapper}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Button title="Create account" onPress={onSubmit} disabled={!canSubmit} />
                )}
                {!canSubmit && (
                    <Text style={{ marginTop: 8, opacity: 0.7 }}>
                        Password must be at least 8 characters and all fields are required.
                    </Text>
                )}
            </View>
        </View>
    );


}


