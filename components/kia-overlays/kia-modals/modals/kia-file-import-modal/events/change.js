
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTAction === 'uploadFileInput') this.importFile();
	}

	static async importFile(){
		props.root.$id.tab.classList.add('hide');
		props.root.$id.importLoader.classList.add('show');

		const file = props.root.$id.uploadFileInput.files[0];
		let parsedData = null;

		const isPSD = file.name.toLowerCase().endsWith(".psd") || file.type === "image/vnd.adobe.photoshop";
        const isZIP = file.name.toLowerCase().endsWith(".zip") || file.type === "application/zip";

		try {
			if(isZIP) {
                parsedData = await KIA.transformer.fflateZip.zipToProject(file);
            } else if (isPSD) {
                parsedData = await KIA.transformer.psdToObject(file);
            }
		} catch(error) {
			props.root.close();
			props.root.$id.tab.classList.remove('hide');
			props.root.$id.importLoader.classList.remove('show');

			console.log(error);
		}
		
		if(parsedData) KIA.actions.kiaFileImportModal.importProject(parsedData);

		props.root.close();		
		props.root.$id.tab.classList.remove('hide');
		props.root.$id.importLoader.classList.remove('show');
	}
} 

export default Index;