export const PROYECTO_STATUSES = ["published", "upcoming"] as const;
export type ProyectoStatus = (typeof PROYECTO_STATUSES)[number];

export type Proyecto = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  status: ProyectoStatus;
};

function upcoming(id: string): Proyecto {
  return {
    id,
    title: "",
    description: "",
    technologies: [],
    status: "upcoming",
  };
}

export const PROYECTOS: Proyecto[] = [
  upcoming("proyecto-01"),
  upcoming("proyecto-02"),
  upcoming("proyecto-03"),
  upcoming("proyecto-04"),
  upcoming("proyecto-05"),
  upcoming("proyecto-06"),
];
