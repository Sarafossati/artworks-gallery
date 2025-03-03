export interface ITableProps {
    data: IArtifactsResponse[];
    hasPagination?: boolean;
    handleArrowClick?: (id: number) => void
}

export interface IArtifactsResponse {
  id: number;
  title: string;
}
