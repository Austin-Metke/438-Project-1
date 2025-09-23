import { register } from '@/api/auth';
import { Octicons } from '@expo/vector-icons';
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppLogo from '../components/appLogo';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const togglePasswordView = () => setViewPassword(v => !v);
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

            if (password !== validatePassword) {
                Alert.alert("Passwords do not match!")
                return;
            }
            const resp = await register(firstName, lastName, email, password);
            console.log(resp.message);
            switch (resp.message) {
                case "success":
                    Alert.alert("Account created successfuly!");
                          router.replace("/(auth)/login");
                    
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
            alignItems: 'stretch',   // make children take full width
            alignSelf: 'stretch',    //  ensure this screen fills parent width
            backgroundColor: '#fff',
        },
        formInputWrapper: {
            width: '100%',           // full width rows
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
            marginLeft: 8,           // replaces gap for broader support
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

        primaryButton: {
            height: 48,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#841584",
        },
        primaryButtonPressed: {
            opacity: 0.85,
            transform: [{ scale: 0.98 }],
        },
        primaryButtonDisabled: {
            backgroundColor: "#c9c9c9",
        },
        primaryButtonText: {
            color: "#fff",
            fontWeight: "700",
            fontSize: 16,
        },
    });



    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: '#fff', flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.container}>

                <AppLogo></AppLogo>

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
                        secureTextEntry={!viewPassword}
                        textContentType="newPassword"
                        autoCapitalize="none"
                        returnKeyType="done"
                    />

                    <Pressable onPress={togglePasswordView} hitSlop={10} accessibilityRole="button" accessibilityLabel="Toggle password visibility">
                        <Octicons name={viewPassword ? 'eye' : 'eye-closed'} size={20} color="#0005" />
                    </Pressable>
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
                        secureTextEntry={!viewPassword}
                        textContentType="newPassword"
                        autoCapitalize="none"
                        returnKeyType="done"
                    />
                    <Pressable onPress={togglePasswordView} hitSlop={10} accessibilityRole="button" accessibilityLabel="Toggle password visibility">
                        <Octicons name={viewPassword ? 'eye' : 'eye-closed'} size={20} color="#0005" />
                    </Pressable>
                </View>
            </View>

            <PrimaryButton title={'Create an Account'} onPress={onSubmit} style={{ alignSelf: 'center', minWidth: 300 }} disabled={!canSubmit} />

            <View style={styles.footerContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <Link href="/login" style={styles.link}>
                    Login
                </Link>
            </View>

        </KeyboardAwareScrollView >
    );


}


