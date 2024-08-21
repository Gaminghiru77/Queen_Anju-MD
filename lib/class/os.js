const os = require('os')
const si = require('systeminformation')

class SystemInfo {
 constructor() {
  this.osName = this.getOSName()
  this.cpuInfo = this.getCPUInfo()
  this.gpuInfo = this.getGPUInfo()
  this.ramInfo = this.getRAMInfo()
  this.systemInfo = this.getSystemInfo()
 }

 /**
  * Get the operating system name and version.
  * @returns {string} The OS name and version.
  */
 getOSName() {
  return `${os.type()} ${os.release()}`
 }

 /**
  * Get CPU information.
  * @returns {Promise<Object>} A promise that resolves to an object containing CPU details.
  */
 async getCPUInfo() {
  const cpu = await si.cpu()
  return {
   manufacturer: cpu.manufacturer,
   brand: cpu.brand,
   speed: `${cpu.speed} GHz`,
   cores: cpu.cores,
  }
 }

 /**
  * Get GPU information.
  * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects containing GPU details.
  */
 async getGPUInfo() {
  const graphics = await si.graphics()
  return graphics.controllers.map(controller => ({
   model: controller.model,
   vendor: controller.vendor,
   vram: `${controller.vram} MB`,
  }))
 }

 /**
  * Get total, free, and used RAM.
  * @returns {Object} An object containing total, free, and used RAM in GB.
  */
 getRAMInfo() {
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  return {
   total: `${(totalMem / 1024 ** 3).toFixed(2)} GB`,
   free: `${(freeMem / 1024 ** 3).toFixed(2)} GB`,
   used: `${((totalMem - freeMem) / 1024 ** 3).toFixed(2)} GB`,
  }
 }

 /**
  * Get overall system information.
  * @returns {Promise<Object>} A promise that resolves to an object containing system details.
  */
 async getSystemInfo() {
  const system = await si.system()
  return {
   manufacturer: system.manufacturer,
   model: system.model,
   serial: system.serial,
   uuid: system.uuid,
  }
 }

 /**
  * Retrieve all system information.
  * @returns {Promise<Object>} A promise that resolves to an object containing all system details.
  */
 async getAllInfo() {
  const cpu = await this.cpuInfo
  const gpu = await this.gpuInfo
  const system = await this.systemInfo

  return {
   os: this.osName,
   cpu,
   gpu,
   ram: this.ramInfo,
   system,
  }
 }
}

module.exports = SystemInfo
/**
 * @example {Below | Run}
 */
// (async () => {
//   const sysInfo = new SystemInfo();
//   const info = await sysInfo.getAllInfo();
//   console.log(info);
// })();
