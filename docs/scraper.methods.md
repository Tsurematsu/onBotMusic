```js
const listDevices = await confUser.voiceAndVideo.input.getDevices()
console.log('listDevices', listDevices.default)
	await confUser.close()
```