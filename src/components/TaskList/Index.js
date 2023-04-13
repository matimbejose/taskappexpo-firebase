import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';




export default function TaskList({ data, deleteItem, editItem}) {
    return(
        <View style={styles.container} >

            <TouchableOpacity style={{ marginRight: 10}}>
            <Ionicons name="trash-outline" size={24} color="white" onPress={ () => deleteItem(data.key) }/>
            </TouchableOpacity>

            <View style={{ paddingRight: 10}}>
                <TouchableWithoutFeedback onPress={ () => editItem(data) }>
                    <Text style={{ color: '#FFF', paddingRight: 10}}>{ data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4
    }
})