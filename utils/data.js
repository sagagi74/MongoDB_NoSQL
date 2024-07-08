const users = [
    { username: '', email: 'tim@gmail.com' },
    { username: 'yong', email: 'yong@gmail.com' }
  ];
  
  const thoughts = [
    {
      thoughtText: "Here's a cool thought...",
      username: 'tim',
      reactions: [
        {
          reactionBody: "Cool thought, tim!",
          username: 'yong'
        }
      ]
    },
    {
      thoughtText: "Here's another cool thought...",
      username: 'yong',
      reactions: [
        {
          reactionBody: "Nice thought, yong!",
          username: 'tim'
        }
      ]
    }
  ];
  
  module.exports = { users, thoughts };