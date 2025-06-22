import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../utils/api.service';
import { API } from '../constants/api';
import { MatDialog } from '@angular/material/dialog';
import { CreateGadgetDialogComponent } from './create-gadget-dialog/create-gadget-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gadgets',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './gadgets.component.html',
  styleUrl: './gadgets.component.css',
})
export class GadgetsComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'price',
    'category',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  selection = new Set<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((shouldRefresh) => {
      if (shouldRefresh) this.fetchGadgets();
    });
  }

  editGadget(gadget: any) {
    const dialogRef = this.dialog.open(CreateGadgetDialogComponent, {
      width: '600px',
      data: gadget,
    });

    dialogRef.afterClosed().subscribe((shouldRefresh) => {
      if (shouldRefresh) this.fetchGadgets();
    });
  }

  deleteGadget(gadget: any) {
    if (confirm(`Are you sure you want to delete "${gadget.name}"?`)) {
      this.api.delete(`${API.GADGETS}/${gadget.id}`).subscribe(() => {
        this.fetchGadgets();
      });
    }
  }

  toggleSelection(row: any) {
    this.selection.has(row.id)
      ? this.selection.delete(row.id)
      : this.selection.add(row.id);
  }

  toggleAll(event: any) {
    if (event.checked) {
      this.dataSource.data.forEach((g) => this.selection.add(g.id));
    } else {
      this.selection.clear();
    }
  }

  isAllSelected(): boolean {
    return (
      this.selection.size > 0 &&
      this.selection.size === this.dataSource.data.length
    );
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete the selected gadgets?')) {
      const ids = Array.from(this.selection);
      this.api.post(`${API.GADGETS}/bulk-delete`, { ids }).subscribe(() => {
        this.selection.clear();
        this.fetchGadgets();
      });
    }
  }

  bulkUpdate() {
    const ids = Array.from(this.selection);
    console.log('Bulk update (to implement):', ids);
  }

  viewGadget(row: any) {
    this.router.navigate(['/gadgets', row.id]);
  }
}
