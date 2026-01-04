import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalizeFirstLetter",
  standalone: true,
  pure: true,
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value || value.length === 0) {
      return "";
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}

