import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { supabase } from '../utils/supabase';

export default function Comment() {
  const [comment, setComment] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  return (
    <View>
      <Text>Comment</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={comment} onChangeText={setComment}
      />
      <Button
        title="comment"
        onPress={async () => {
          const {data, error} = await supabase.from('comments').insert([{
            text: comment
          }]).select()

          if (error) {
            setErrorMsg(error.message)
            console.log('error', error)
          }
          setComment('');
        }}
      />
    </View>
  )
}
