class DotNetService {    
    getHealthCheck(){
        return fetch(process.env.REACT_APP_DOTNET_ROOT_URL + "/Health/HealthCheck",{ 
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
export default new DotNetService();