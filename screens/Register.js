import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        pin: '',
        confirmPin: '',
    });

    const handleChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRegister = async () => {
        if (formData.pin !== formData.confirmPin) {
            Alert.alert('Error', 'Pin and confirm pin do not match');
            return;
        }

        try {
            const response = await fetch('http://192.168.1.8:8000/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    pin: formData.pin,
                    confirmPin: formData.confirmPin, 
                })
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Registration successful');
                navigation.navigate('Landing');
            } else {
                Alert.alert('Error', result.msg || 'Registration failed');
            }
        } catch (error) {
            Alert.alert('Error', `Error: ${error.message}`);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }} >
            <SafeAreaView style={{ flex: 1, padding: 40 }} >
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                    enableAutomaticScroll={true}
                    enableOnAndroid={true}
                    extraScrollHeight={100}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <Image
                        source={require("../assets/images/kgv.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.registerText}>Register</Text>
                    <TextInput
                        placeholder='Full Name'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('fullName', text)}
                        value={formData.fullName}
                    />
                    <TextInput
                        placeholder='Phone Number'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('phoneNumber', text)}
                        value={formData.phoneNumber}
                        keyboardType='phone-pad'
                    />
                    <TextInput
                        placeholder='PIN'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('pin', text)}
                        value={formData.pin}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholder='Confirm PIN'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('confirmPin', text)}
                        value={formData.confirmPin}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.loginLink} 
                        onPress={() => navigation.navigate('Loginvisitor')}
                    >
                        <Text style={styles.loginText}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                
                {!keyboardVisible && (
                    <View style={styles.footer}>
                        <Image
                            source={require("../assets/images/mantra.jpg")}
                            style={styles.footerImage}
                        />
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerText}>Made in</Text>
                            <Image
                                source={require("../assets/images/image 10.png")}
                                style={styles.footerFlag}
                            />
                        </View>
                        <Image
                            source={require("../assets/images/make-in-India-logo.jpg")}
                            style={styles.footerLogo}
                        />
                    </View>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 201,
        height: 181,
        alignSelf: 'center',
        marginBottom: 20
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        borderStyle: 'solid',
        padding: 10,
        width: '80%',
        marginTop: 10
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20
    },
    loginLink: {
        marginTop: 20,
    },
    loginText: {
        color: '#007BFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    footerImage: {
        width: 60,
        height: 60,
    },
    footerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: '#000',
        paddingLeft: 2,
    },
    footerFlag: {
        width: 40,
        height: 20,
    },
    footerLogo: {
        width: 80,
        height: 60,
    }
});



// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         phoneNumber: '',
//         pin: '',
//     });

//     const handleChange = (name, value) => {
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleRegister = async () => {
//         try {
//             const response = await fetch('http://192.168.1.8:8000/api/v1/auth/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 Alert.alert('Success', 'Registration successful');
//                 navigation.navigate('Landing');
//             } else {
//                 Alert.alert('Error', result.message || 'Registration failed');
//             }
//         } catch (error) {
//             Alert.alert('Error', `Error: ${error.message}`);
//         }
//     };

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardVisible(true);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardVisible(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     return (
//         <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }} >
//             <SafeAreaView style={{ flex: 1, padding: 40 }} >
//                 <KeyboardAwareScrollView
//                     resetScrollToCoords={{ x: 0, y: 0 }}
//                     contentContainerStyle={styles.container}
//                     scrollEnabled={true}
//                     enableAutomaticScroll={true}
//                     enableOnAndroid={true}
//                     extraScrollHeight={100}
//                     showsVerticalScrollIndicator={false}
//                     showsHorizontalScrollIndicator={false}
//                 >
//                     <Image
//                         source={require("../assets/images/kgv.png")}
//                         style={styles.logo}
//                     />
//                     <Text style={styles.registerText}>Register</Text>
//                     <TextInput
//                         placeholder='fullName'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('fullName', text)}
//                         value={formData.fullName}
//                     />
//                     <TextInput
//                         placeholder='Phone Number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('phoneNumber', text)}
//                         value={formData.phoneNumber}
//                         keyboardType='phone-pad'
//                     />
//                     <TextInput
//                         placeholder='pin'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('pin', text)}
//                         value={formData.pin}
//                     />
                   

//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={handleRegister}
//                     >
//                         <Text style={styles.buttonText}>Register</Text>
//                     </TouchableOpacity>

//                     {/* Navigation to Login */}
//                     <TouchableOpacity 
//                         style={styles.loginLink} 
//                         onPress={() => navigation.navigate('Loginvisitor')}
//                     >
//                         <Text style={styles.loginText}>Already have an account? Login</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>
                
//                 {!keyboardVisible && (
//                     <View style={styles.footer}>
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             style={styles.footerImage}
//                         />
//                         <View style={styles.footerTextContainer}>
//                             <Text style={styles.footerText}>Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 style={styles.footerFlag}
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             style={styles.footerLogo}
//                         />
//                     </View>
//                 )}
//             </SafeAreaView>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     logo: {
//         width: 201,
//         height: 181,
//         alignSelf: 'center',
//         marginBottom: 20
//     },
//     input: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         borderStyle: 'solid',
//         padding: 10,
//         width: '80%',
//         marginTop: 10
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         borderRadius: 50,
//         alignItems: 'center',
//         width: '100%',
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     registerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 20
//     },
//     loginLink: {
//         marginTop: 20,
//     },
//     loginText: {
//         color: '#007BFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 16,
//     },
//     footerImage: {
//         width: 60,
//         height: 60,
//     },
//     footerTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footerText: {
//         color: '#000',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     }
// });

