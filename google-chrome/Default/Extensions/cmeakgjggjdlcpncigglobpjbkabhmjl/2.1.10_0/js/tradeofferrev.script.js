var itemRegExp = /BuildHover.*;/i;

var _tradesTimers = {};
var _openedWins = {};
SIH?.panelMode?.loadHtml();

if (IS_ENABLED_SIH) {
  function ShowFriendSelect(title, fnOnSelect) {
    var Modal = ShowAlertDialog(
      title,
      '<div class="group_invite_throbber"><img src="https://community.akamai.steamstatic.com/public/images/login/throbber.gif"></div>',
      'Cancel'
    );
    var $ListElement = $J('<div/>', { class: 'player_list_ctn' });
    var $Buttons = Modal.GetContent().find('.newmodal_buttons').detach();

    Modal.GetContent().css('min-width', 268);

    var rgParams = { type: 'friends' };

    $J.get('https://steamcommunity.com/actions/PlayerList/', rgParams, function (html) {
      $ListElement.html(html);

      $ListElement.find('a').remove();
      $ListElement.find('[data-miniprofile]').each(function () {
        var $El = $J(this);

        $El.click(function () {
          Modal.Dismiss();
          fnOnSelect($El.data('miniprofile'));
          SIH?.latestFriends?.SaveLatestFriend($El);
        });
      });

      var $Content = Modal.GetContent().find('.newmodal_content');
      $Content.html(''); // erase the throbber
      $Content.append($ListElement);
      $Content.append($Buttons);

      SIH?.latestFriends?.RenderLatestSelectedFriends();

      Modal.AdjustSizing();
    });
  }

  if (open_trade_in_new_tab) {
    ShowTradeOffer = function (tradeOfferID, rgParams) {
      let strParams = '';
      if (rgParams) strParams = '?' + $J.param(rgParams);

      const strURL = 'https://steamcommunity.com/tradeoffer/' + tradeOfferID + '/' + strParams;

      window.open(strURL, '_blank').focus();
    };
  }
}

$J(function () {
  if (IS_ENABLED_SIH) {
    var warningMsg = $J(
      '<div class="warning_message text text_tiny" style="color: red; z-index: 0">Warning! This is an empty trade offer, you will not receive anything after accepted.<br /> <a href="https://support.steampowered.com/kb_article.php?ref=2178-QGJV-0708#whatoffer" target="_blank">Steam wallet funds can not be included in trade, or trade offer.</a></div>'
    );
    warningMsg.click(function (e) {
      e.stopPropagation();
    });
    var emptyTradeOffers = $J('.tradeoffer_items.primary .tradeoffer_item_list:not(:has(.trade_item ))');
    emptyTradeOffers.append(warningMsg);
    emptyTradeOffers.parents('.tradeoffer_items_ctn').find('.link_overlay').css('top', '110px');
  }

  $J(function () {
    $J(window).on('message', function (event) {
      var origin = event.originalEvent.origin;
      var data = event.originalEvent.data;
      if (
        origin &&
        data &&
        ('http://steamcommunity.com/'.indexOf(origin) == 0 || 'https://steamcommunity.com/'.indexOf(origin) == 0)
      ) {
        if (data.type == 'accepted' || (data.type == 'await_confirm' && _openedWins[data.tradeofferid])) {
          _openedWins[data.tradeofferid].close();
        }
      }
    });
  });

  var category = $J('.right_controls_large_block_active_bg').parent();
  if (category.length) {
    const data = { get_sent_offers: 1, get_received_offers: 1 };

    chrome.runtime.sendMessage(SIHID, { type: 'GetLastTrades', data }, (result) => {
      if (!result.success) return;

      var sentCounters = {},
        receivedCounters = {};

      $J.each(result.response.trade_offers_sent || [], function (i, row) {
        if (sentCounters[row.accountid_other]) {
          sentCounters[row.accountid_other].count++;
        } else {
          sentCounters[row.accountid_other] = { count: 1 };
        }
      });
      $J.each(result.response.trade_offers_received || [], function (i, row) {
        if (receivedCounters[row.accountid_other]) {
          receivedCounters[row.accountid_other].count++;
        } else {
          receivedCounters[row.accountid_other] = { count: 1 };
        }
      });

      $J('.tradeoffer').each(function (i, el) {
        var tradeId = el.getAttribute('id').split('_')[1],
          primary = '',
          secondary = '';
        var primaryProfileId = $J(el).find('.tradeoffer_items.primary .tradeoffer_avatar').data('miniprofile');
        var secondaryProfileId = $J(el).find('.tradeoffer_items.secondary .tradeoffer_avatar').data('miniprofile');

        if (sentCounters[secondaryProfileId] !== undefined && receivedCounters[secondaryProfileId] !== undefined) {
          primary = 'Sent: ' + sentCounters[secondaryProfileId].count;
          secondary = 'Received: ' + receivedCounters[secondaryProfileId].count;
        }
        if (receivedCounters[primaryProfileId] !== undefined && sentCounters[primaryProfileId] !== undefined) {
          secondary = 'Sent: ' + sentCounters[primaryProfileId].count;
          primary = 'Received: ' + receivedCounters[primaryProfileId].count;
        }

        $J('#tradeofferid_' + tradeId + ' .tradeoffer_items.primary .tradeoffer_items_header').append(
          '<div class="label">' + primary + '</div>'
        );
        $J('#tradeofferid_' + tradeId + ' .tradeoffer_items.secondary .tradeoffer_items_header').append(
          '<div class="label">' + secondary + '</div>'
        );
      });
    });
  }

  if (IS_ENABLED_SIH) {
    const data = SIH?.common?.GetDataFromLocalStorage();
    if (data && data.mode && data.mode === 'lite') {
      SIH?.common?.sendTradeofferTxtToBackground();
      SIH?.filter?.load();
      SIH?.tradeofferLite?.load();
      SIH?.itemsRule?.load();
      SIH?.items?.load();
      SIH?.footer?.load();
      SIH?.common?.removeDeclinedOfferFromSihWindow();
      SIH?.common?.sendTradeLinkToBackground();
    } else {
      SIH?.common?.sendTradeofferTxtToBackground();
      SIH?.filter?.load();
      SIH?.tradeoffer?.load();
      SIH?.items?.load();
      SIH?.lots?.load();
      SIH?.itemsRule?.load();
      SIH?.footer?.load();
      SIH?.common?.removeDeclinedOfferFromSihWindow();
      SIH?.common?.sendTradeLinkToBackground();
    }
  }
});

var regRpLink = /javascript:ReportTradeScam\( '(\d+)',/;
