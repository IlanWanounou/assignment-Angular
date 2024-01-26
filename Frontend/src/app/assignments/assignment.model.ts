export class Assignment {
  _id?:number;
  id!:number
  nom!:string
  dateDeRendu!:Date
  rendu!:boolean
  note!:number
  remarques!:string
  matiere!:{
    name:string,
    photoProf:string
    photoMatiere :string
  }
  auteur!:string
}
