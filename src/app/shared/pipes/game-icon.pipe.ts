import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gameIcon",
  standalone: true,
  pure: true,
})
export class GameIconPipe implements PipeTransform {
  transform(iconName: string): string {
    const icons: Record<string, string> = {
      clover: "🍀",
      star: "⭐",
      sparkles: "✨",
    };
    return icons[iconName] || "🎲";
  }
}
