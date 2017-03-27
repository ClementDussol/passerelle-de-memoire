class Category {
	
	constructor(name) {
		this.entryPoint = null;
		this.name = name;
		this.resources = [];
	}

	add(r) {
		this.resources.push(r);
	}

	orderResources(){
		let len = this.resources.length;

		this.resources.sort((a, b)=>{

			let aPert = this.entryPoint.relativePertinence(a);
			let bPert = this.entryPoint.relativePertinence(b);
			
			return bPert - aPert;
		})
	}

	placeResources(){
		
		let obj = {};

		for (let i = 0; i < this.resources.length; i++) {
			if (this.resources[i] == this.entryPoint) {continue};
			let p = this.resources[i].relativePertinence(this.entryPoint);
			if (obj[p]){
				obj[p].push(this.resources[i]);
			} else {
				obj[p] = [];
				obj[p].push(this.resources[i]);
			}
		}

		console.log(obj);
	}
}