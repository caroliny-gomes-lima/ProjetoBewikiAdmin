import React from "react";
import { UserCardStyle as Styles } from "../../styles";
import { Grid } from "@material-ui/core";
import { Texts } from "../../../../../config";
import { FormHolder } from "../../../../../FormConfig";
import { connect } from "react-redux";
import { Delete } from "@material-ui/icons";
import { customModal } from "../../../../modals/utils";
import { Creators } from "../../reduxSagas";

function DeleteModal({ userData, isFetching, EnabledUsersDelete }) {
  const text = Texts["pt-BR"].users.enabledUsers.deleteModal;

  const handleOpenModal = () => {
    customModal.setInfos(
      null,
      text.title,
      [text.text],
      null,
      null,
      modalInside()
    );
  };

  function sendParameters() {
    EnabledUsersDelete(userData.id);
    customModal.close();
  }

  const modalInside = () => {
    return (
      <>
        <FormHolder onSubmit={sendParameters}>
          <Styles.ModalContent>
            <Grid container spacing={0} direction="row">
              <Styles.IconAvatar />

              <Styles.UserInfoContent $setMarginLeft>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Styles.UserInfosText $fontType={2}>
                    {userData.name}
                  </Styles.UserInfosText>
                </Grid>
                <Grid container spacing={0} direction="row">
                  <Styles.IconHowToReg />

                  <Grid item xs={8} sm={8} md={8} lg={10}>
                    <Styles.UserInfosText $fontType={1}>
                      {new Date(userData.date).toLocaleDateString()}
                    </Styles.UserInfosText>
                  </Grid>
                </Grid>
              </Styles.UserInfoContent>
            </Grid>
          </Styles.ModalContent>

          <Grid container spacing={0} justify="flex-end">
            <Styles.FooterModal>
              <Styles.TextFieldButtonCancel onClick={() => customModal.close()}>
                {text.cancel}
              </Styles.TextFieldButtonCancel>

              <Styles.TextFieldButtonAccept
                type="submit"
                name="button"
                loading={isFetching}
                disabled={isFetching}
              >
                {text.confirm}
              </Styles.TextFieldButtonAccept>
            </Styles.FooterModal>
          </Grid>
        </FormHolder>
      </>
    );
  };

  return (
    <>
      <Styles.ButtonModal onClick={() => handleOpenModal()}>
        <Delete />
      </Styles.ButtonModal>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const { EnabledUsersDelete } = Creators;
  return {
    EnabledUsersDelete: function (userId) {
      return dispatch(EnabledUsersDelete(userId));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
