import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectsItemRowProps {
  project: Project;
  onHoverDescription: (description: string | null) => void;
}

export default function ProjectsItemRow({ project, onHoverDescription }: ProjectsItemRowProps) {
  const hasLinks = project.liveUrl ?? project.githubUrl;

  return (
    <div
      className="flex items-center gap-2 py-1.5 px-1 border-b border-ff7-border/50 last:border-b-0 cursor-default"
      onMouseEnter={() => onHoverDescription(project.description)}
      onMouseLeave={() => onHoverDescription(null)}
    >
      {/* Item icon (pouch-style) */}
      <div className="flex-none w-6 h-6 bg-gray-600 border border-ff7-border rounded-sm flex items-center justify-center">
        <span className="text-[10px]">◆</span>
      </div>

      <div className="min-w-0 flex-1 text-white text-sm flex items-center gap-2 flex-wrap">
        <span className="truncate">{project.title}</span>
        {hasLinks && (
          <span className="flex items-center gap-1.5 text-xs shrink-0">
            {project.liveUrl && (
              project.liveUrl.startsWith("http") ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ff7-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live
                </a>
              ) : (
                <Link href={project.liveUrl} className="text-ff7-accent hover:underline">
                  Live
                </Link>
              )
            )}
            {project.liveUrl && project.githubUrl && (
              <span className="text-ff7-border/60">|</span>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ff7-accent hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
