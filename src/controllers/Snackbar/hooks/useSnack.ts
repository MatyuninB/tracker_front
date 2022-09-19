import { useContext } from "react"
import { SnackbarContext } from "../Snackbar.provider";

export const useSnack = () => {
  const { alert, error} = useContext(SnackbarContext);
  return { alert, error };
}