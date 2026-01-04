import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "padNumber",
  standalone: true,
  pure: true,
})
export class PadNumberPipe implements PipeTransform {
  transform(value: number, length: number = 2, fillString: string = "0"): string {
    return value.toString().padStart(length, fillString);
  }
}

