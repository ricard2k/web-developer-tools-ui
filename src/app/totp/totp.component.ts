import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { TotpService } from './totp.service';
import { SecondClockService } from './second-clock.service';
import { Observer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-totp',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './totp.component.html',
  styleUrl: './totp.component.css',
  providers: [ 
    TotpService, 
    SecondClockService 
  ],
})

export class TotpComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private totpService: TotpService, 
    private secondClockService: SecondClockService, 
    private route: ActivatedRoute
  ) {
    this.totpForm = this.fb.group({
      key: ['', [Validators.required, this.keyValidator]],
      digits: [6, [Validators.required, Validators.min(1)]],
      timeStep: [30, [Validators.required, Validators.min(1)]]
    });
  }

  public totpForm: FormGroup;
  public otp: string = '';
  public remainingTime: number = 0;

  /**
   * Generates a Time-based One-Time Password (TOTP) using the provided key, time step, 
   * and number of digits.
   * 
   * @returns The generated TOTP.
   */
  public generateTotp() {
    try {
      const { key, timeStep, digits } = this.totpForm.value;
      this.otp = this.totpService.genTotp(key, timeStep, digits);
      this.updateRemainingTime();
    } catch (error) {
      this.otp = 'Error generating TOTP';
      this.remainingTime = 0;
    }
  }

  /**
   * Validates a key by checking if it contains only valid characters.
   * 
   * @param control - The control to validate.
   * @returns An object with the validation error if the key contains invalid characters, 
   * otherwise null.
   */
  public keyValidator(control: AbstractControl): ValidationErrors | null {
    const validCharacters = /^[A-Z2-7]*$/;
    if (!validCharacters.test(control.value)) {
      return { invalidKey: 'Key contains invalid characters' };
    }
    return null;
  }

  /**
   * Updates the remaining time for the TOTP (Time-Based One-Time Password) component.
   * Calculates the remaining time until the next time step based on the current time.
   * @returns A boolean indicating the needed of update the totp.
   */
  public updateRemainingTime(): boolean {
    const timeStep = this.totpForm.value.timeStep;
    const remainingTime = timeStep - Math.floor((Date.now() / 1000) % timeStep);
    const ret = (this.remainingTime < remainingTime) || (this.remainingTime > timeStep);
    this.remainingTime = remainingTime;
    return ret;
  }

  ngOnInit(): void {
    this.totpForm.valueChanges.subscribe(() => {
      this.generateTotp();
    });

    this.route.paramMap.subscribe(paramMap => {
      this.totpForm.patchValue({
        key: paramMap.get('key') || '',
        digits: paramMap.get('digits') || 6,
        timeStep: paramMap.get('timeStep') || 30
      });
      this.generateTotp();
    });

    this.secondClockService.getSecondAsObservable().subscribe({
        next: (data: number) => {
          if (this.updateRemainingTime()) {
            this.generateTotp();
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('Second clock observable completed');
        }
      });
  }
}

