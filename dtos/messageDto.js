

const getMessageInfoResourceForTeacher = async (message)=>{
    let messageInfo = {
        senderName: message.sender.name,
        senderId:message.sender.id,
        date: message.createdAt,
    }
    const sender = await message.getSender()
    if (message.sender.roleId === 2) {
        let student = await sender.getStudent()
        let classRoom = await student.getClass()
        messageInfo['class'] = classRoom.name
        messageInfo['senderType'] = 'student'
    } else if (message.sender.roleId === 3)
    {
        let parent = await sender.getParent()
        let student = await parent.getStudent()
        let classRoom = await student.getClass()
        messageInfo['class'] = classRoom.name
        messageInfo['senderType'] = 'parent'
    }
    return messageInfo
}

module.exports={
    getMessageInfoResourceForTeacher
}