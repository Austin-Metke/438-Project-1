import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import {createStaticNavigation} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { login } from '@/api/auth';
import { Octicons } from '@expo/vector-icons';
import { Link, router } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { saveToken } from '../../api/tokenStorage';
import AppLogo from '../components/appLogo';
import PrimaryButton from '../components/PrimaryButton';

export default function Login() {
  const [email, setEmailName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const togglePasswordView = () => setViewPassword(v => !v);
  const emailTrim = email.trim();
  const canSubmit = emailTrim.length > 0 && password.length > 0 && !isLoading;

  const handleLogin = async (): Promise<void> => {
    const e = email.trim();

    if (!e || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!emailOk) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const data = await login(e, password); // LoginResp
      await saveToken(data.token);
      Alert.alert("Welcome", "Logged in successfully!");
      router.replace("/(tabs)/account");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong logging in.";
      Alert.alert("Error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#fff', flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>

        <AppLogo></AppLogo>

        <View style={styles.formInputWrapper}>
          <Octicons name="person" size={22} color="#0008" />
          <TextInput
            cursorColor="#000"
            style={styles.input}
            value={email}
            onChangeText={setEmailName}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email"
            textContentType="username"
          />
        </View>

        <View style={styles.formInputWrapper}>
          <Octicons name="shield-lock" size={22} color="#0008" />
          <TextInput
            cursorColor="#000"
            style={styles.input}
            value={password}
            secureTextEntry={!viewPassword}
            onChangeText={setPassword}
            placeholder="Password"
            textContentType="password"
          />

          <Pressable onPress={togglePasswordView} hitSlop={10} accessibilityRole="button" accessibilityLabel="Toggle password visibility">
            <Octicons name={viewPassword ? 'eye' : 'eye-closed'} size={20} color="#0005" />
          </Pressable>
        </View>


        <PrimaryButton title={'Login'} onPress={handleLogin} disabled={!canSubmit}/>

        <View style={styles.footerContainer}>
          <Text style={styles.text}>Don&apos;t have an account?</Text>
          <Link href="/sign-up" style={styles.link}>
            Sign up
          </Link>
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 32,               // large enough to stand out
    fontWeight: '700',           // bold for authority
    color: '#1B4C6B',             // a deep blue to match your icon background
    textAlign: 'center',
    marginBottom: 24,            // space below the title
    letterSpacing: 0.5,           // subtle spacing for a polished look
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'stretch',   //  make children take full width
    alignSelf: 'stretch',    //  ensure this screen fills parent width
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',  // center the icon horizontally
    marginTop: 24,
    marginBottom: 24,

  },
  formInputWrapper: {
    width: '100%',           //  full width rows
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0002',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: '#fff',
 
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
