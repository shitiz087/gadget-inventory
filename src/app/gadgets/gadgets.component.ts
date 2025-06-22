import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../utils/api.service';
import { API } from '../constants/api';
import { MatDialog } from '@angular/material/dialog';
import { CreateGadgetDialogComponent } from './create-gadget-dialog/create-gadget-dialog.component';

@Component({
  selector: 'app-gadgets',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, HttpClientModule],
  templateUrl: './gadgets.component.html',
  styleUrl: './gadgets.component.css',
})
export class GadgetsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'category'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchGadgets();
  }

  fetchGadgets(): void {
    this.api.get(API.GADGETS).subscribe((res: any) => {
      this.dataSource.data = res.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateGadgetDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.post(API.GADGETS, result).subscribe(() => {
          this.fetchGadgets();
        });
      }
    });
  }
}
