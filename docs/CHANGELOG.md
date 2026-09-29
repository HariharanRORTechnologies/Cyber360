# Changelog

## 2026-09-18

### Added
- Initial project requirements documentation.
- Assessment ID convention: `SA-YY-NN`.
- Finding ID convention: `SA-YY-NN.FF`.
- Multi-role user model.
- Assessment and Finding lifecycle definitions.
- Returned Finding workflow.
- Retest workflow.
- Risk Register/deadline extension workflow.
- SLA status definitions.
- Initial Finding field list.
- Initial Project Details field list.

### Decision
Closed Findings will initially use logical archival through the master Findings data source rather than physical movement to a separate archive source.

### Reason
This preserves relationships, IDs, history, reporting and workflow consistency while providing an Archive Findings view.
