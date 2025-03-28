defineWebSocket({
    open(peer) {
        console.log("Socket opened !");
    },
    close(peer) {
        console.log("Socker closed !");
    },
    error(peer, error) {
        console.log("Error : ", error);
    },
    message(peer, message) {
        console.log("Message : ", message.text());
    }
})