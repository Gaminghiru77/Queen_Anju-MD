class server {
 constructor() {
  this.activeUsers = 0
 }

 async fetchData() {
  try {
   const response = await fetch('https://socket-counter.onrender.com/active-users')
   const data = await response.json()
   this.activeUsers = data.activeUsers
  } catch (error) {
   console.error(`Error fetching data: ${error}`)
  }
 }

 getActiveUsers() {
  return this.activeUsers
 }
}
module.exports = server
