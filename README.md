firebase:
- firebase auth for users
- store xml files and parameter settings

react:
- offer examples for each type of operation
- expression testing area - fold away when not in use?
  - add 'param' class to text inside input?
  - add hover effect on param menu items to highlight .param text inside input
- text area input for raw svg file
- detect parameters button
  - use javascript to detect params in text
  - generate params menu
  - saves svg to firebase
  - saves params to svg/param_sets in firebase
- evaluate button
  - pulls params from params menu
  - hits ruby back end
  - saves result to svg/param_sets/:id/result in firebase
- output svg
  - use javascript to remap @if to mouseover/label text
- link to github project
