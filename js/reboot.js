const Reboot = async () => {  
	setTimeout(() => { ws.send("reboot"); close(); }, 2000);
};
