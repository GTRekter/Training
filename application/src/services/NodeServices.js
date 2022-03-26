class NodeService {    
    getHealthCheck(){
        return fetch(process.env.REACT_APP_NODE_ROOT_URL + "/healthcheck",{ 
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then(res => res.json());        
    }
}
export default new NodeService();