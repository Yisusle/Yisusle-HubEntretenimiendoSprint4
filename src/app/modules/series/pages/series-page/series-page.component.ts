import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { SeriesService } from '../../service/series.service';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/core/models/movie.model';
import { DetailsComponent } from '@shared/components/details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { Serie } from 'src/app/core/models/series.model';

@Component({
  selector: 'app-series-page',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './series-page.component.html',
  styleUrl: './series-page.component.css'
})
export class SeriesPageComponent implements OnInit{
  
  series: Serie[] = [];

  constructor(private seriesService: SeriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe(data => {
      this.series = data;
      //console.log('Series:', this.series); 
    });
  }

  openDialog(item: Serie): void {
    this.dialog.open(DetailsComponent, {
      width: '800px',
      data: item
    });
  }
}
