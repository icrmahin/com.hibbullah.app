export type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  recordType: string;
  oldValue?: string;
  newValue?: string;
};
