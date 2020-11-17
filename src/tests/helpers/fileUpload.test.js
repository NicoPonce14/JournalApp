import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dpdpcigpl', 
    api_key: '475457933599384', 
    api_secret: 'gYazyTbhr235dSSmX4ou4SidZTI' 
  });

describe('Pruebas en helper fileUpload', () => {
    test('debe de cargar un archivo y retornar el URL', async(done) => {
       
        const resp = await fetch('https://static8.depositphotos.com/1020341/896/i/950/depositphotos_8969502-stock-photo-human-face-with-cracked-texture.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg')
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagen por id
        const segments = url.split('/');
        const imgId = segments[segments.length - 1].replace('.jpg','');

        cloudinary.v2.api.delete_resources(imgId, {}, ()=>{
            done();
        });

    });
    
    test('debe de retornar un error', async() => {
    
        const file = new File([], 'foto.jpg')
        const url = await fileUpload(file);

        expect( url).toBe(null);

    });
})
