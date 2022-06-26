import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../common'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Onboarding = () => {
    const navigation = useNavigation();
    const [page, setPage] = useState(0)

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('SkipWalkThrough', JSON.stringify(1))

        } catch (e) {
            alert('failed to save')
        }
        navigation.navigate("Login")
    }
    return (
        <Swiper
            paginationStyle={styles.threeDots}
            onIndexChanged={(i) => {
                setTimeout(() => {
                    setPage(i)
                }, 200);
            }}
            index={page}
            loop={false}
            dot={<Image style={styles.inactiveDot} source={Icons.inactive} />}
            activeDot={<Image style={styles.inactiveDot} source={Icons.active} />}
        >
            <View style={styles.container}>
                <ImageBackground source={Icons.illustration1}
                    resizeMode='cover'
                    style={styles.bg}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.skipContainer}>
                            <Text style={styles.content}>Skip</Text>
                        </TouchableOpacity>
                        <View style={styles.ellipseContainer}>
                            <Image
                                source={Icons.ellipse}

                                style={styles.icon}

                            />
                        </View>
                        <View style={styles.yogaImageContainer}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={Icons.yoga}

                                    style={styles.yogaImage}

                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.mainContentContainer}>
                        <Text style={styles.mainContent}>Welcome to Ravindi App</Text>
                    </View>
                    <View style={styles.midContainer}>
                        <Text style={styles.midContent}>We will find the perfect group for you based on your unique profile. So get active and compete at your fitness level for a chance to get paid.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton onPress={() => setPage(page + 1)}
                            icon={<Image source={Icons.rightArrow} style={styles.arrow} />}
                            name='Next' />

                    </View>
                </ImageBackground>
            </View>

            <View style={styles.container}>
                <ImageBackground source={Icons.illustration1}
                    resizeMode='cover'
                    style={styles.bg}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.skipContainer}>
                            <Text style={styles.content}>Skip</Text>
                        </TouchableOpacity>
                        <View style={styles.ellipseContainer}>
                            <Image source={Icons.ellipse} style={styles.icon} />
                        </View>
                        <View style={styles.yogaImageContainer}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Icons.yoga} style={styles.yogaImage} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.mainContentContainer2}>
                        <Text style={styles.mainContent}>Easy Communication</Text>
                    </View>
                    <View style={styles.midContainer}>
                        <Text style={styles.midContent}>We will find the perfect group for you based on your unique profile. So get active and compete at your fitness level for a chance to get paid.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton onPress={() => setPage(page + 1)}
                            name='Next'
                            icon={true}
                        />
                    </View>
                </ImageBackground>

            </View>

            <View style={styles.container}>
                <ImageBackground source={Icons.illustration1}
                    resizeMode='cover'
                    style={styles.bg}>

                    <View style={{ flex: 1 }}>
                        <View style={styles.ellipseContainer2}>
                            <Image source={Icons.ellipse} style={styles.icon} />
                        </View>
                        <View style={styles.yogaImageContainer}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Icons.yoga} style={styles.yogaImage} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainContentContainer3}>
                        <Text style={styles.mainContent}>The Perfect Teacher for you</Text>
                    </View>
                    <View style={styles.midContainer}>
                        <Text style={styles.midContent}>We will find the perfect group for you based on your unique profile. So get active and compete at your fitness level for a chance to get paid.</Text>
                    </View>
                    <View style={styles.buttonContainer}>

                        <CustomButton onPress={saveData}
                            name='Lets Get Started'
                            icon={<Image source={Icons.rightArrow} style={styles.arrow} />}
                        />

                    </View>
                </ImageBackground>
            </View>
        </Swiper>


    );

}
export default Onboarding;

const styles = StyleSheet.create({
    threeDots: { position: 'absolute', top: hp(21) },
    inactiveDot: {
        width: wpx(16),
        height: hpx(6),
        resizeMode: 'stretch',
        marginHorizontal: wpx(5)
    },
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    bg: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    skipContainer: { alignItems: 'flex-end', width: wpx(355), marginTop: hpx(30) },
    content: { fontSize: nf(20), fontFamily: Fonts.bold, textAlign: 'left', color: Colors.white },
    ellipseContainer: { marginTop: hpx(31), alignSelf: "center" },
    ellipseContainer2: { marginTop: hpx(80), alignSelf: "center" },
    icon: {
        width: wpx(175),
        height: hpx(200),
        resizeMode: 'contain',
    },
    yogaImageContainer:
    {
        marginTop: hpx(-135),
        marginLeft: wpx(47),
        marginRight: wpx(47),
    },
    yogaImage: {
        width: wpx(281),
        height: hpx(312),
        resizeMode: 'contain',
    },
    mainContentContainer: {
        paddingTop: hpx(59),
    },
    mainContentContainer2: {
        paddingTop: hpx(59),
    },
    mainContentContainer3: { paddingTop: hpx(59), },
    mainContent: { fontSize: nf(20), textAlign: 'center', fontFamily: Fonts.semiBold, color: '#000000', },
    midContainer: { marginTop: hpx(20), width: wpx(312), height: hpx(98), alignItems: "center", justifyContent: "center" },
    midContent: { fontSize: nf(16), fontFamily: Fonts.light, color: '#000000', textAlign: 'center', },
    buttonContainer: { marginTop: hpx(47), marginBottom: hpx(50), alignSelf: "center", alignItems: "center", justifyContent: "center" },
    arrow: { marginLeft: wp(1) }


});