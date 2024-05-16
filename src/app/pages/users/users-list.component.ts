import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../core/services/users/users.service';
import { user } from '../../core/models/user';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TruncatePipe } from '../../shared/pipes/truncate/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule,DatePipe,MatButtonModule,MatIcon,TruncatePipe,MatTooltipModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit,OnDestroy{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  displayedColumns: string[] = ['#', 'Name', 'Email', 'Phone', 'Address', 'RegisterDate'];
  _usersService = inject(UsersService)
  users = signal<user[]>([])

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(){
    this._usersService.getUsers().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((res:user[])=>{
      this.users.set(res)
    })
  }

  onNavigateBack(){
    history.back()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
