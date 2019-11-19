const env = process.env.NODE_ENV || 'dev';

const config = () => {

    switch(env) {
        case 'dev': 
            return {
                url: 'mongodb://localhost/api'
            }   
        
        case 'hml': 
            return {
                url: 'mongodb://localhost/api'
            }
        
        case 'prod':
            return {
                url: 'mongodb://localhost/api'
            }
    }
}

console.warn(`Voce esta no ambiente ${env.toUpperCase()}`);

module.exports = config();