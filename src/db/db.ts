import monoose from 'mongoose';

export async function connect(){
    try {
        monoose.connect(process.env.MONGO_URI!)
        const connection = monoose.connection;

        connection.on('connected', () => {
            console.log('Connected!!');
        })

        connection.on('error', (err) => {
            console.log('Error in db connection! -> ', err);
        })
        
    } catch (error) {
        console.log('Something went error',error);
    }
} 