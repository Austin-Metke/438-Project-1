import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native';
// import {createStaticNavigation} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { login } from '@/api/auth';
import { Octicons } from '@expo/vector-icons';
import { router } from "expo-router";
import {saveToken} from '../../api/tokenStorage';

export default function Login() {
  const [email, setEmailName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleLogin = async (): Promise<void> => {
    const e = email.trim();

    if (!e || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!emailOk) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
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

  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          textContentType="password"
        />
      </View>

      <View style={styles.buttonWrapper}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Log In"
            onPress={handleLogin}
            color="#841584"
            accessibilityLabel="Log in to your account"
            disabled={!email.trim() || !password}

          />
        )}
      </View>
    </View>
  );
}


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
});
