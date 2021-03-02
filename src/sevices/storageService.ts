export function set(name: string, value: any): void {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function get(name: string): any {
  return JSON.parse(window.localStorage.getItem(name)!);
}

export function del(name: string) {
  localStorage.removeItem(name);
}
