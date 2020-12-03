import { Component, OnInit, Inject } from '@angular/core';
import { CandidatoService} from '../candidato.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class Candidato {
    id!: number;
    nome!: string;
    partido!: string;
    numero!: number;
}

const CANDIDATOS: Candidato[] = [
  {id: 1, nome: 'Joao', partido: 'PV', numero:19},
  {id: 1, nome: 'Meire', partido: 'PV', numero:19}
];

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'nome', 'partido', 'numero'];
  dataSource!: Candidato[];

  constructor(private service: CandidatoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getCandidatos().subscribe(candidatos => this.dataSource = candidatos);
  }
  openNewDialog(): void {
    const dialogRef = this.dialog.open(MngCandidatoDialog, {
      width: '750px',
      data: new Candidato()
    });

    dialogRef.afterClosed().subscribe(candidato => {
      this.service.adicionar(candidato).subscribe(candidatoId =>{

      });
    })
  }
}

@Component({
  selector: 'dialog-mng-candidato',
  templateUrl: 'dialog-mng-candidato.html'
})
export class MngCandidatoDialog {
  constructor(public dialogRef: MatDialogRef<MngCandidatoDialog>,
  @Inject(MAT_DIALOG_DATA) public data: Candidato){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
