const users = [
    { username: 'tim', email: 'tim@gmail.com' },
    { username: 'yong', email: 'yong@gmail.com' }
  ];
  
  const thoughts = [
    {
      thoughtText: "First thought",
      username: 'tim',
      reactions: [
        {
          reactionBody: "Cool, tim!",
          username: 'yong'
        }
      ]
    },
    {
      thoughtText: "another thought...",
      username: 'yong',
      reactions: [
        {
          reactionBody: "bad thought, yong!",
          username: 'tim'
        }
      ]
    }
  ];
  
  module.exports = { users, thoughts };